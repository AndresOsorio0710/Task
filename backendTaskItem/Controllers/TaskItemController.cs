using backendTaskItem.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace backendTaskItem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemController : ControllerBase
    {
        private readonly TaskItemContext taskItemContext;

        public TaskItemController(TaskItemContext _taskItemContext)
        {
            this.taskItemContext = _taskItemContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> Get()
        {
            return await this.taskItemContext.TaskItems.OrderByDescending(taskItem => taskItem.Priority).ThenBy(taskItem => taskItem.DateSave).ToListAsync();
        }

        [HttpGet("{_id}")]
        public async Task<ActionResult<TaskItem>> Get(Guid _id)
        {
            var taskItem = await this.taskItemContext.TaskItems.FindAsync(_id);
            if (taskItem == null)
            {
                return NotFound();
            }
            return taskItem;
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> Post(TaskItem _taskItem)
        {
            _taskItem.TaskItemId = Guid.NewGuid();
            _taskItem.DateSave = DateTime.Now;
            this.taskItemContext.TaskItems.Add(_taskItem);
            await this.taskItemContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = _taskItem.TaskItemId }, _taskItem);
        }

        [HttpPut("{_id}")]
        public async Task<IActionResult> Put(Guid _id, TaskItem _taskItem)
        {
            if (_id != _taskItem.TaskItemId)
            {
                return BadRequest();
            }
            var taskItem = await this.taskItemContext.TaskItems.FindAsync(_id);
            if (taskItem == null)
            {
                return NotFound();
            }
            taskItem.Title = _taskItem.Title;
            taskItem.Description = _taskItem.Description;
            taskItem.Priority = _taskItem.Priority;
            this.taskItemContext.Entry(taskItem).State = EntityState.Modified;
            await this.taskItemContext.SaveChangesAsync();
            return Ok(taskItem);
        }

        [HttpDelete("{_id}")]
        public async Task<IActionResult> Delete(Guid _id)
        {
            var taskItem = await this.taskItemContext.TaskItems.FindAsync(_id);
            if (taskItem == null)
            {
                return NotFound();
            }
            this.taskItemContext.Remove(taskItem);
            await this.taskItemContext.SaveChangesAsync();
            return Ok("Registry deleted successfully.");
        }
    }
}