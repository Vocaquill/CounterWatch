namespace BLL.Models.Account;

/// <summary>
/// Json - модель створення жанру
/// </summary>
public class AccountLoginModel
{
    /// <summary>
    /// Email користувача
    /// </summary>
    /// <example>
    /// tymchuksasho724@gmail.com
    /// </example>
    public string Email { get; set; } = string.Empty;
    /// <summary>
    /// Пароль користувача
    /// </summary>
    /// <example>
    /// Qwerty123!
    /// </example>
    public string Password { get; set; } = string.Empty;
}
