using AMP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Data
{
    interface IJiraRepository
    {
        List<Sprint> GetSprints();
        List<Story> GetStoriesBySprint(int sprintId);
        List<Models.Task> GetTasksByStory(int storyId);
    }
}
