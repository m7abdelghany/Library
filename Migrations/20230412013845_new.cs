using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Data",
                table: "Books");

            migrationBuilder.AddColumn<string>(
                name: "BriefDescription",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BriefDescription",
                table: "Books");

            migrationBuilder.AddColumn<byte[]>(
                name: "Data",
                table: "Books",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
