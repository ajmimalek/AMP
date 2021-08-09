﻿// <auto-generated />
using System;
using AMP.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AMP.Migrations
{
    [DbContext(typeof(AMPContext))]
    partial class AMPContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AMP.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("456157e9-1df2-4ca7-9c65-d51d01b17a9f"),
                            Email = "malek.ajmi@se.linedata.com",
                            Password = "$2a$11$wzE9AJ/jK4EepRNW71ZOJeLzaUsJPp8.f8xDx6vfSPKgbWKs54K46",
                            Role = "Developer",
                            UserName = "ajmimalek"
                        },
                        new
                        {
                            Id = new Guid("9d470211-5681-438c-adde-bd9652ec5ae6"),
                            Email = "adel.adel@se.linedata.com",
                            Password = "$2a$11$tNk1yWhtrA5wfjiK8S2SUeQdvUD0P/jy9SSgl8JGB31LY1.YAjRN6",
                            Role = "Manager",
                            UserName = "adeladel"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
