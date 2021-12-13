using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backendTaskItem.Models
{
    public class TaskItem
    {
        [Key, Column("id"), JsonProperty("id")]
        public Guid TaskItemId { get; set; }
        [Required(ErrorMessage = "Title required."), Column("title"), JsonProperty("title"), StringLength(30, ErrorMessage = "The Title cannot contain more than 30 characters.")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Description required."), Column("description"), JsonProperty("description"), StringLength(200, ErrorMessage = "The Decription cannot contain more than 200 characters.")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Priority required."), Column("priority")]
        public Boolean Priority { get; set; }
        [Required(ErrorMessage = "Date Save required."), Column("dateSave"), JsonProperty("dateSave"), DisplayFormat(DataFormatString = "0:yyy-MM-dd", ApplyFormatInEditMode = true)]
        public DateTime DateSave { get; set; }
    }
}