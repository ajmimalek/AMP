using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AMP.Migrations
{
    public partial class AddingData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "Role", "UserName" },
                values: new object[] { new Guid("456157e9-1df2-4ca7-9c65-d51d01b17a9f"), "malek.ajmi@se.linedata.com", "$2a$11$wzE9AJ/jK4EepRNW71ZOJeLzaUsJPp8.f8xDx6vfSPKgbWKs54K46", "Developer", "ajmimalek" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "Role", "UserName" },
                values: new object[] { new Guid("9d470211-5681-438c-adde-bd9652ec5ae6"), "adel.adel@se.linedata.com", "$2a$11$tNk1yWhtrA5wfjiK8S2SUeQdvUD0P/jy9SSgl8JGB31LY1.YAjRN6", "Manager", "adeladel" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("456157e9-1df2-4ca7-9c65-d51d01b17a9f"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("9d470211-5681-438c-adde-bd9652ec5ae6"));
        }
    }
}
