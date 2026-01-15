namespace BLL.Interfaces;

public interface IAuthService
{
    Task<long> GetUserId();
}
