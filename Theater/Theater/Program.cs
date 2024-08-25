using Domain.Repositories;
using Infrastructure.Foundation;
using Infrastructure.Foundation.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder( args );

builder.Services.AddScoped<ITheaterRepository, TheaterRepository>();
builder.Services.AddScoped<IWorkingHoursRepository, WorkingHoursRepository>();
builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
builder.Services.AddScoped<ICompositionRepository, CompositionRepository>();
builder.Services.AddScoped<IPlayRepository, PlayRepository>();

string connectionString = builder.Configuration.GetConnectionString( "Theater" );
builder.Services.AddDbContext<TheaterDbContext>( o =>
{
    o.UseSqlServer( connectionString,
        ob => ob.MigrationsAssembly( typeof( TheaterDbContext ).Assembly.FullName ) );
} );

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

WebApplication app = builder.Build();

if ( app.Environment.IsDevelopment() )
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();