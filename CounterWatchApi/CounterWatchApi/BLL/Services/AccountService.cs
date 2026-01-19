using AutoMapper;
using BLL.Interfaces;
using BLL.Models.Account;
using BLL.SMTP;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Text.Json;

namespace BLL.Services;

public class AccountService(IJwtTokenService tokenService,
    UserManager<UserEntity> userManager,
    IMapper mapper,
    IConfiguration configuration,
    IImageService imageService,
    ISmtpService smtpService
    ) : IAccountService
{

    public async Task<string> LoginByGoogle(string token)
    {
        using var httpClient = new HttpClient();

        httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);

        string userInfo = configuration["GoogleUserInfo"] ?? "https://www.googleapis.com/oauth2/v2/userinfo";
        var response = await httpClient.GetAsync(userInfo);

        if (!response.IsSuccessStatusCode)
            return null;

        var json = await response.Content.ReadAsStringAsync();

        var googleUser = JsonSerializer.Deserialize<AccountGoogleAccountModel>(json);

        var existingUser = await userManager.FindByEmailAsync(googleUser!.Email);
        if (existingUser != null)
        {
            var userLoginGoogle = await userManager.FindByLoginAsync("Google", googleUser.GogoleId);

            if (userLoginGoogle == null)
            {
                await userManager.AddLoginAsync(existingUser, new UserLoginInfo("Google", googleUser.GogoleId, "Google"));
            }
            var jwtToken = await tokenService.CreateTokenAsync(existingUser);
            return jwtToken;
        }
        else
        {
            var user = mapper.Map<UserEntity>(googleUser);

            if (!String.IsNullOrEmpty(googleUser.Picture))
            {
                user.Image = await imageService.SaveImageFromUrlAsync(googleUser.Picture);
            }

            var result = await userManager.CreateAsync(user);
            if (result.Succeeded)
            {

                result = await userManager.AddLoginAsync(user, new UserLoginInfo(
                    loginProvider: "Google",
                    providerKey: googleUser.GogoleId,
                    providerDisplayName: "Google"
                ));

                await userManager.AddToRoleAsync(user, "User");
                var jwtToken = await tokenService.CreateTokenAsync(user);
                return jwtToken;
            }
        }

        return string.Empty;
    }
    public async Task<bool> ForgotPasswordAsync(AccountForgotPasswordModel model)
    {
        //var user = await userManager.FindByEmailAsync(model.Email);
        var user = await userManager.Users.FirstOrDefaultAsync(x=> x.Email == model.Email && !x.IsDeleted);

        if (user == null)
        {
            return false;
        }

        string token = await userManager.GeneratePasswordResetTokenAsync(user);
        var resetLink = $"{configuration["ClientUrl"]}/reset-password?token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(model.Email)}";

        var emailModel = new EmailMessage
        {
            To = model.Email,
            Subject = "Password Reset",
            Body = $@"<!DOCTYPE html>
<html lang=""uk"">
    <head>
        <meta charset=""UTF-8"">
        <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
        <title>Відновлення пароля</title>
    </head>
    <body style=""margin:0; padding:0; background-color:#000000; font-family:Arial,sans-serif; color:white;"">
        <div style=""max-width:600px; margin:0 auto; padding:40px 20px; text-align:center;"">

            <h1 style=""font-size:28px; font-weight:bold; text-transform:uppercase; margin-bottom:16px;"">
                Відновлення <span style=""color:#ef4444;"">пароля</span>
            </h1>

            <p style=""font-size:16px; color:#d1d5db; margin-bottom:32px;"">
                Ми отримали запит на відновлення пароля для вашого акаунта. Натисніть кнопку нижче, щоб створити новий пароль.
            </p>

            <a href=""{resetLink}"" 
               style=""background-color:#ef4444; color:white; font-weight:bold; text-transform:uppercase; padding:16px 32px; border-radius:12px; text-decoration:none; display:inline-block; font-size:16px;"">
                Reset Password
            </a>

            <p style=""font-size:12px; color:#9ca3af; margin-top:24px;"">
                Якщо ви не запитували відновлення пароля, просто ігноруйте цей лист.
            </p>

            <p style=""font-size:12px; color:#6b7280; margin-top:32px;"">
                © 2026 O.W.A.C.N. Всі права захищені.
            </p>

        </div>
    </body>
</html>"
        };

        var result = await smtpService.SendEmailAsync(emailModel);

        return result;
    }

    public async Task<bool> ValidateResetTokenAsync(AccountValidateResetTokenModel model)
    {
        //var user = await userManager.FindByEmailAsync(model.Email);
        var user = await userManager.Users.FirstOrDefaultAsync(x => x.Email == model.Email && !x.IsDeleted);

        return await userManager.VerifyUserTokenAsync(
            user,
            TokenOptions.DefaultProvider,
            "ResetPassword",
            model.Token);
    }

    public async Task ResetPasswordAsync(AccountResetPasswordModel model)
    {
        //var user = await userManager.FindByEmailAsync(model.Email);
        var user = await userManager.Users.FirstOrDefaultAsync(x => x.Email == model.Email && !x.IsDeleted);

        if (user != null)
            await userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
    }

}
