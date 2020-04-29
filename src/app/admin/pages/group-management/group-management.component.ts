import { Component, OnInit, Injectable } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
  group_id: string
  hierarchy_id: string
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  group_id: string;
  hierarchy_id: string;
  children: TodoItemNode[];
}


@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})

export class GroupManagementComponent implements OnInit {
  groups: any;
  adminDetails: any;
  currentpath = null;
  pagenumber = 0;
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  get data(): TodoItemNode[] { return this.dataChange.value; }
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(private alert: AlertServiceService, private adminservice: AdminServicesService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit() {
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    this.getgroups();
  }

  getgroups() {
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: 0 };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      console.log(result);
      this.groups = result.data.getgroup.message;
      console.log(this.groups);
      const array = [];
      this.groups.forEach(element => {
        const node = new TodoItemNode();
        node.item = element.group_name;
        node.group_id = element.group_id;
        node.hierarchy_id= element.hierarchy_id;
        array.push(node);
      });
      this.dataSource.data = array;
    });
  }

    /**
     * Determines whether scroll down on
     */
  onScrollDown(event) {
    console.log(event);
    this.pagenumber = this.pagenumber + 10;
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: this.pagenumber };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      console.log(result);
      this.groups = result.data.getgroup.message;
      this.groups.push(...result.data.getgroup.message);

      console.log(this.groups);
      const array = [];
      this.groups.forEach(element => {
        const node = new TodoItemNode();
        node.item = element.group_name;
        node.group_id = element.group_id;
        node.hierarchy_id= element.hierarchy_id;
        array.push(node);
      });
      this.dataSource.data = array;
    });
  }

  /** Loads sub group */
  loadsubgroup(node1) {
    const index = this.dataSource.data.findIndex(x => x.group_id === node1.group_id);
    const data = { input_id: node1.group_id, type: 'group', pagenumber: 0 };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      const group = result.data.getgroup.message;
      if (group.length) {
        group.forEach(element => {
          const node = new TodoItemNode();
          node.item = element.group_name;
          node.group_id = element.group_id;
          node.hierarchy_id= element.hierarchy_id;
          if (node1.children) {
            node1.children.push(node);
          } else {
            node1.children = [];
            node1.children.push(node);
          }
        });
      }
      let array = [];
      array = node1;
      this.dataChange.next(this.data);
      let array1 = [];
      array1 = this.dataSource.data;
      array1[index] = array;
      this.dataChange.next(this.data);
      this.dataSource.data = array1;
    });
  }

  selectgroup(node) {
    console.log(node);
    if (node.checkbox === true) {
      this.currentpath = node;
    } else {
      this.currentpath = null;
    }
  }
  savegroup(form) {
    console.log(this.currentpath);
    let hierarchy ;
    if (form.valid) {
      if (this.currentpath.hierarchy_id) {
        const str = this.currentpath.hierarchy_id.split('h');
        hierarchy = 'h' + (Number(str[1]) + Number(1));
      }
      const data = {
        group_name: form.value.group_name, group_type: 'new',
        parent_group_id: this.currentpath ? this.currentpath.group_id : 'null',
        hierarchy_id: this.currentpath ? hierarchy : 'h1',
        admin_id: this.adminDetails._id
      };
      console.log(data);
      this.adminservice.creategroup(data).subscribe((result: any) => {
        console.log(result);
        if (result.data.createusergroup.success === true) {
          this.alert.openAlert('Success !', 'Group Created Successfully');
          form.reset();
          this.getgroups();
        } else {
          this.alert.openAlert(result.data.createusergroup.message, null);
        }
      });
    }
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.group_id = node.group_id;
    flatNode.expandable = !!node.children;
    flatNode.children = node.children;
    flatNode.hierarchy_id = node.hierarchy_id;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }
}
