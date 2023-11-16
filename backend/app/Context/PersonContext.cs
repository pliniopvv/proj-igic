using app.Models;
using Microsoft.EntityFrameworkCore;

namespace app.Context
{
    public class PersonContext : DbContext
    {
        public PersonContext(DbContextOptions<PersonContext> options) : base(options) { }

        public DbSet<Person> Persons { get; set; } = null;
    }
}
