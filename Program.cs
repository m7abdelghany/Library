using Library.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Library
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddDbContext<LibraryDbContext>(a=>a.UseSqlServer(builder.Configuration.GetConnectionString("Con1")));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(CorsOption =>
            {
                CorsOption.AddPolicy("Pol1", CorsPolicyBuilder =>
                {
                    CorsPolicyBuilder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
            });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("Pol1");
            app.MapControllers();

            app.Run();
        }
    }
}