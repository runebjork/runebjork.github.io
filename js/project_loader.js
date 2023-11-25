// Assume the URL is like `project_template.html?project=project1`

document.addEventListener('DOMContentLoaded', function () {
    // Extract project ID from URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
  
    // Fetch the project details from the JSON file
    fetch('projects.json')
      .then(response => response.json())
      .then(projects => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
          document.getElementById('project-title').textContent = project.project_name;
          document.getElementById('project-year').textContent = project.year;
          document.getElementById('project-role').textContent = project.role;
          document.getElementById('project-info').textContent = project.info;
          document.getElementById('project-tags').textContent = project.tags.join(', ');
          const img = document.createElement("img");
          img.src = project.header_image;
          document.getElementById('project-header').appendChild(img);
        } else {
          // Handle case where project is not found
          console.error('Project not found');
        }
      });
  });
