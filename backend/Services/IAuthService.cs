using System;
using backend.Entities;
using backend.Models;

namespace backend.Services;

public interface IAuthService
{
    Task<User?> RegisterAsync(UserDto request);
    Task<string?> LoginAsync(UserDto request);

}
