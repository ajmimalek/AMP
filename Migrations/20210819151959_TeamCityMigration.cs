using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AMP.Migrations
{
    public partial class TeamCityMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("456157e9-1df2-4ca7-9c65-d51d01b17a9f"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("9d470211-5681-438c-adde-bd9652ec5ae6"));

            migrationBuilder.CreateTable(
                name: "Builds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Number = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WebURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WaitingTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExecutionTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    DurationNetTime = table.Column<int>(type: "int", nullable: false),
                    ArtifactSize = table.Column<int>(type: "int", nullable: false),
                    VisibleArtificatSize = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Builds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BuildStageDurations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    FirstStepPrep = table.Column<int>(type: "int", nullable: false),
                    SourceUpdate = table.Column<int>(type: "int", nullable: false),
                    ToolsUpdating = table.Column<int>(type: "int", nullable: false),
                    BStepRunner_11 = table.Column<int>(type: "int", nullable: false),
                    BStepRunner_12 = table.Column<int>(type: "int", nullable: false),
                    BuildFinish = table.Column<int>(type: "int", nullable: false),
                    ArtifactPublishing = table.Column<int>(type: "int", nullable: false),
                    BuildFK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildStageDurations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuildStageDurations_Builds_Id",
                        column: x => x.Id,
                        principalTable: "Builds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Changes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateChange = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BuildId = table.Column<int>(type: "int", nullable: true),
                    BuildFK = table.Column<int>(type: "int", nullable: false),
                    ChangesId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Changes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Changes_Builds_BuildId",
                        column: x => x.BuildId,
                        principalTable: "Builds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Changes_Changes_ChangesId",
                        column: x => x.ChangesId,
                        principalTable: "Changes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CodeCoverage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    ClassCovered = table.Column<int>(type: "int", nullable: false),
                    ClassNonCovered = table.Column<int>(type: "int", nullable: false),
                    ClassTotal = table.Column<int>(type: "int", nullable: false),
                    ClassPercent = table.Column<float>(type: "real", nullable: false),
                    MethodCovered = table.Column<int>(type: "int", nullable: false),
                    MethodNonCovered = table.Column<int>(type: "int", nullable: false),
                    MethodTotal = table.Column<int>(type: "int", nullable: false),
                    MethodPercent = table.Column<float>(type: "real", nullable: false),
                    StatementCovered = table.Column<int>(type: "int", nullable: false),
                    StatementNonCovered = table.Column<int>(type: "int", nullable: false),
                    StatementTotal = table.Column<int>(type: "int", nullable: false),
                    StatementPercent = table.Column<float>(type: "real", nullable: false),
                    BuildFK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeCoverage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CodeCoverage_Builds_Id",
                        column: x => x.Id,
                        principalTable: "Builds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CodeInspections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Errors = table.Column<int>(type: "int", nullable: false),
                    Warnings = table.Column<int>(type: "int", nullable: false),
                    BuildFK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeInspections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CodeInspections_Builds_Id",
                        column: x => x.Id,
                        principalTable: "Builds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    BuildId = table.Column<int>(type: "int", nullable: true),
                    BuildFK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tests_Builds_BuildId",
                        column: x => x.BuildId,
                        principalTable: "Builds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChangeType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChangesId = table.Column<int>(type: "int", nullable: true),
                    ChangesFK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Files_Changes_ChangesId",
                        column: x => x.ChangesId,
                        principalTable: "Changes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "Role", "UserName" },
                values: new object[] { new Guid("93707108-36f0-49eb-b367-898e9109f409"), "malek.ajmi@se.linedata.com", "$2a$11$oO/LhkSEuX/W60Swzrl26eWx9H8V76f.InKw4f5O81i046PXsg0jC", "Developer", "ajmimalek" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "Role", "UserName" },
                values: new object[] { new Guid("ad76ad35-cbf3-4742-b0a1-f68cdf756d1a"), "adel.adel@se.linedata.com", "$2a$11$WPFK.9M9o9xbGwegeK2os.HBQNWDUE0bh.DEZcql2ihnPe5YMfEZ6", "Manager", "adeladel" });

            migrationBuilder.CreateIndex(
                name: "IX_Changes_BuildId",
                table: "Changes",
                column: "BuildId");

            migrationBuilder.CreateIndex(
                name: "IX_Changes_ChangesId",
                table: "Changes",
                column: "ChangesId");

            migrationBuilder.CreateIndex(
                name: "IX_Files_ChangesId",
                table: "Files",
                column: "ChangesId");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_BuildId",
                table: "Tests",
                column: "BuildId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildStageDurations");

            migrationBuilder.DropTable(
                name: "CodeCoverage");

            migrationBuilder.DropTable(
                name: "CodeInspections");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.DropTable(
                name: "Changes");

            migrationBuilder.DropTable(
                name: "Builds");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("93707108-36f0-49eb-b367-898e9109f409"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("ad76ad35-cbf3-4742-b0a1-f68cdf756d1a"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "Role", "UserName" },
                values: new object[] { new Guid("456157e9-1df2-4ca7-9c65-d51d01b17a9f"), "malek.ajmi@se.linedata.com", "$2a$11$wzE9AJ/jK4EepRNW71ZOJeLzaUsJPp8.f8xDx6vfSPKgbWKs54K46", "Developer", "ajmimalek" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "Role", "UserName" },
                values: new object[] { new Guid("9d470211-5681-438c-adde-bd9652ec5ae6"), "adel.adel@se.linedata.com", "$2a$11$tNk1yWhtrA5wfjiK8S2SUeQdvUD0P/jy9SSgl8JGB31LY1.YAjRN6", "Manager", "adeladel" });
        }
    }
}
