using Microsoft.EntityFrameworkCore;

namespace ContactManagementSys.Models
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options) : base (options) { }
        public DbSet<Users> Users { get; set; } = null!;
        public DbSet<Contact> Contacts { get; set; } = null!;
    }
}
