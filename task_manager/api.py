import frappe 

@frappe.whitelist()
def get_tasks_by_project(project_name):
    return frappe.get_all(
        "Task",
        filters={"relevant_project": project_name},
        fields=["name", "title", "description","priority", "status", "sample", "due_date"]
    )

