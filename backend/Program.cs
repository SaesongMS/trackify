using Data;
using Helpers;
using Models;
using Services;
using Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using Quartz;

var builder = WebApplication.CreateBuilder(args);

// disable logging of ef core
builder.Logging.AddFilter("Microsoft.EntityFrameworkCore.Database.Command", LogLevel.None);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<Data.DatabaseContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<Data.DatabaseContext>();
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<ScrobbleService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<RatingService>();
builder.Services.AddScoped<CommentService>();
builder.Services.AddScoped<FollowService>();
builder.Services.AddScoped<FavouriteSongService>();
builder.Services.AddScoped<ReportService>();

//specify Configuration base path
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory());
builder.Configuration.AddJsonFile("appsettings.Development.json", optional: false, reloadOnChange: true);

var jwtSettings = new JWTSettings();
builder.Configuration.Bind("JWTSettings", jwtSettings);

var spotifySettings = new SpotifySettings();
builder.Configuration.Bind("SpotifySettings", spotifySettings);

builder.Services.AddSingleton(jwtSettings);
builder.Services.AddTransient<JWTCreator>();
builder.Services.AddSingleton(spotifySettings);
builder.Services.AddTransient<SpotifyService>();


// builder.Services.AddControllers().AddNewtonsoftJson(options =>
//     options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
// );
builder.Services.AddControllers().AddJsonOptions(options =>
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = jwtSettings.Audience,
        ValidIssuer = jwtSettings.Issuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key))
    };
    options.SaveToken = true;
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
    {
        if (context.Request.Cookies.ContainsKey("X-Access-Token"))
        {
            context.Token = context.Request.Cookies["X-Access-Token"];
        }
        return Task.CompletedTask;
    }
    };
})
.AddCookie(options =>
{
    options.Cookie.Name = "X-Access-Token";
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.IsEssential = true;
});

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
    options.User.RequireUniqueEmail = true;

    //lockout settings
    // options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    // options.Lockout.MaxFailedAccessAttempts = 5;
    // options.Lockout.AllowedForNewUsers = true;
});

// builder.Services.AddAuthorization(options =>
// {
//     options.AddPolicy("RequireAdminRole",
//          policy => policy.RequireRole("Admin"));
// });

//comment this region to disable automatic scrobbling
#region Quartz
builder.Services.AddQuartz(q =>
{
    var jobKey = new JobKey("CreateScrobbleJob");
    q.AddJob<Jobs.CreateScrobbleJob>(opts => opts.WithIdentity(jobKey));

    q.AddTrigger(opts => opts
        .ForJob(jobKey)
        .WithIdentity("CreateScrobbleJob-trigger")
        // .WithCronSchedule("0/30 * * * * ? *")); //every 30 seconds
        .WithCronSchedule("0 0/1 * 1/1 * ? *")); // every minute
        //.WithCronSchedule("0 * * ? * *") // every minute when seconds are 0
});

builder.Services.AddQuartzHostedService(options =>
{
    options.WaitForJobsToComplete = true;
    options.AwaitApplicationStarted = true;
});
#endregion


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.WithOrigins("http://frontend:3000")
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
    options.WithOrigins("http://localhost:3000")
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }
