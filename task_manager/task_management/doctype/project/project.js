frappe.ui.form.on('Project', {
    refresh: function(frm) {
        if (frm.doc.name) {
            frappe.call({
                method: 'task_manager.api.get_tasks_by_project', 
                args: {
                    project_name: frm.doc.name  
                },
                callback: function(response) {
                    let tasks = response.message;
                    if (!tasks || tasks.length === 0) {
                        frm.set_df_property('tasks_list', 'options', "<p>No tasks found.</p>");
                        frm.refresh_field('tasks_list');
                        return;
                    }

                    let html = "<table class='table table-bordered'>";
                    html += "<tr><th>Title</th><th>Status</th><th>Assigned To</th><th>Due Date</th></tr>";

                    tasks.forEach(task => {
                        html += `<tr>
                                    <td><a href="/app/task/${task.name}" target="_blank">${task.title}</a></td>
                                    <td>${task.status}</td>
                                    <td>${task.sample || "Unassigned"}</td>
                                    <td>${task.due_date || "-"}</td>
                                 </tr>`;
                    });

                    html += "</table>";
                    frm.set_df_property('tasks_list', 'options', html);
                    frm.refresh_field('tasks_list');
                }
            });
        }
    }
});


