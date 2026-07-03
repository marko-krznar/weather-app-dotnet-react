using System;
using backend.Entities;
using backend.Models;

namespace backend.Services;

public interface IAuthService
{
    Task<User?> RegisterAsync(UserDto request);
    Task<TokenResponseDto?> LoginAsync(string usernameOrEmail, string password);
    Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);

}
