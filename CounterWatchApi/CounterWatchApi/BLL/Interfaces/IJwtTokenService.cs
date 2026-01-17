using DAL.Entities.Identity;

namespace BLL.Interfaces;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(UserEntity user);
}
