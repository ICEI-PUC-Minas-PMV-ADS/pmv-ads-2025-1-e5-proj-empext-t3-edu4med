using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Edu4MedBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class HotFixTabelaVestibular : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Fim_inscricoes",
                table: "Vestibulares",
                newName: "Link_inscricoes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Link_inscricoes",
                table: "Vestibulares",
                newName: "Fim_inscricoes");
        }
    }
}
