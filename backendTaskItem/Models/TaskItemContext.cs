using Microsoft.EntityFrameworkCore;

namespace backendTaskItem.Models
{
    public class TaskItemContext : DbContext
    {
        public TaskItemContext(DbContextOptions<TaskItemContext> options):
            base(options)
        {
            
        }

        public DbSet<TaskItem> TaskItems { get; set; }
    }
}
