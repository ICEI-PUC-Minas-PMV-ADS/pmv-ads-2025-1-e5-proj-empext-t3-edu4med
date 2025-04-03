using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Edu4MedBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class TableUsuarioVestibular : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Editais",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Estado = table.Column<string>(type: "text", nullable: true),
                    DataInicial = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataFinal = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Ativo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Editais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vestibulares",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Universidade = table.Column<string>(type: "text", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: true),
                    Regiao = table.Column<string>(type: "text", nullable: true),
                    Instituicao = table.Column<string>(type: "text", nullable: true),
                    Vagas = table.Column<string>(type: "text", nullable: true),
                    Link_cadastro = table.Column<string>(type: "text", nullable: true),
                    Fim_inscricoes = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Data_prova = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Ativo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vestibulares", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsuariosVestibulares",
                columns: table => new
                {
                    usuarioId = table.Column<int>(type: "integer", nullable: false),
                    vestibularId = table.Column<int>(type: "integer", nullable: false),
                    UsuarioVestibularusuarioId = table.Column<int>(type: "integer", nullable: true),
                    UsuarioVestibularvestibularId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuariosVestibulares", x => new { x.usuarioId, x.vestibularId });
                    table.ForeignKey(
                        name: "FK_UsuariosVestibulares_UsuariosVestibulares_UsuarioVestibular~",
                        columns: x => new { x.UsuarioVestibularusuarioId, x.UsuarioVestibularvestibularId },
                        principalTable: "UsuariosVestibulares",
                        principalColumns: new[] { "usuarioId", "vestibularId" });
                    table.ForeignKey(
                        name: "FK_UsuariosVestibulares_Usuarios_usuarioId",
                        column: x => x.usuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsuariosVestibulares_Vestibulares_vestibularId",
                        column: x => x.vestibularId,
                        principalTable: "Vestibulares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsuariosVestibulares_UsuarioVestibularusuarioId_UsuarioVest~",
                table: "UsuariosVestibulares",
                columns: new[] { "UsuarioVestibularusuarioId", "UsuarioVestibularvestibularId" });

            migrationBuilder.CreateIndex(
                name: "IX_UsuariosVestibulares_vestibularId",
                table: "UsuariosVestibulares",
                column: "vestibularId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Editais");

            migrationBuilder.DropTable(
                name: "UsuariosVestibulares");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Vestibulares");
        }
    }
}
