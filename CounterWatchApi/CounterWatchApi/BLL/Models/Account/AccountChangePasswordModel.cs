namespace BLL.Models.Account;

public class AccountChangePasswordModel
{
    public string OldPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}
