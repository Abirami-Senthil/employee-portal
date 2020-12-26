import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }
  roles = [ "Developer", "Project Manager", "Product Manager", "Finance Head", "Technical Architect", "Admin"]

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    this.employeeService.selectedEmployee = {
      _id: undefined,
      name: "",
      position: "",
      roles: [],
      activate: true,
    }
  }

  onSubmit(form: NgForm) {
    if (!form.value._id) {
      this.employeeService.postEmployee({ ...form.value, roles: this.employeeService.selectedEmployee.roles }).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee({ ...form.value, roles: this.employeeService.selectedEmployee.roles }).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

  onRoleChange(role: any) {
      let index = this.employeeService.selectedEmployee.roles.indexOf(role);
      if(index == -1){
        this.employeeService.selectedEmployee.roles.push(role);
      }
      else{
        this.employeeService.selectedEmployee.roles.splice(index, 1);
      }
  }

  onToggle(emp: Employee) {
    emp.activate = !emp.activate
  }
}
