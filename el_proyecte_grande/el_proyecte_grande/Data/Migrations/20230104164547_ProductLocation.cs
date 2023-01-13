using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace el_proyecte_grande.Data.Migrations
{
    public partial class ProductLocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Product",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Product");
        }
    }
}
