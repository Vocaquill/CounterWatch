using BLL.Models.Account;

namespace BLL.Interfaces;

public interface IAccountService
{
    public Task<string> LoginByGoogle(string token);
    public Task<bool> ForgotPasswordAsync(AccountForgotPasswordModel model);
    public Task<bool> ValidateResetTokenAsync(AccountValidateResetTokenModel model);
    public Task ResetPasswordAsync(AccountResetPasswordModel model);
    public Task ChangePasswordAsync(AccountChangePasswordModel model);
}
