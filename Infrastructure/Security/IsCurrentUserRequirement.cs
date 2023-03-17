using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;
using Application.Interfaces;

namespace Infrastructure.Security
{
    public class IsCurrentUserRequirement : IAuthorizationRequirement
    {

    }

    public class IsCurrentUserRequirementHandler : AuthorizationHandler<IsCurrentUserRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsCurrentUserRequirementHandler(DataContext dbContext,
           IUserAccessor userAccessor, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCurrentUserRequirement requirement)
        {

            var profileUserName = _httpContextAccessor.HttpContext?.Request.Form["username"].ToString();

            if (profileUserName == "") return Task.CompletedTask;

            var username = context.User.FindFirstValue(ClaimTypes.Name);

            if (username != profileUserName) return Task.CompletedTask;

            context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}