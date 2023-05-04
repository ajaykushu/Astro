using Authentication;
using Authentication.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var AppName = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IGoogleAuthenticationService>(op => new GoogleLogin(ClientId: AppName.GetValue<string>("GoogleAuth:ClientId"), ClientSecret: AppName.GetValue<string>("GoogleAuth:Secret")));
builder.Services.AddTransient<ICredAuthentication,CredLogin>();
builder.Services.AddSingleton<IAuthenticationFactory, AuthenticationFactory>() ;
builder.Services.AddDbContext<AstroDBContext>(options =>
       options.UseSqlServer());
builder.Services.AddScoped<IDataAccess, SQLDataAccess>();
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer((o) =>
{
    var Key = Encoding.UTF8.GetBytes(AppName.GetValue<string>("JWT:Key"));
    o.SaveToken = true;
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = AppName.GetValue<string>("JWT:Issuer"),
        ValidAudience = AppName.GetValue<string>("JWT:Audience"),
        IssuerSigningKey = new SymmetricSecurityKey(Key)
    };

});



var app = builder.Build();

// Configure the HTTP request pipeline.





if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseHttpsRedirection();
app.UseCors((x) =>
{
    x.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader();
});
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
