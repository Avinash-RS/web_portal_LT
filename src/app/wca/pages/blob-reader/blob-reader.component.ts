'use strict';
import { OnInit, HostListener, Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { BlobServicesService } from '../../services/azureBlobService/blob-services.service';
import { VideoPreviewModalComponent } from '../../pages/video-preview-modal/video-preview-modal.component';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';

export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

export interface TreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-blob-reader',
  templateUrl: './blob-reader.component.html',
  styleUrls: ['./blob-reader.component.css']
})

export class BlobReaderComponent implements OnInit {

  treeControl: FlatTreeControl<TreeNode>;
  treeFlattener: MatTreeFlattener<FileNode, TreeNode>;
  dataSource: MatTreeFlatDataSource<FileNode, TreeNode>;
  type: any;
  isPreview: boolean;

  constructor(private dialog: MatDialog,
              private azureBlobService: BlobServicesService,
              private dialogRef: MatDialogRef<BlobReaderComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.type = data.type;
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);
    this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  public exploredData = [];
  public exploredFile = [];
  public dataNodes = [];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Escape') { this.closeModel(); }
  }

  ngOnInit() {
    this.getContainers();
    this.dialogRef.updatePosition({ top: '0px' });
  }

  getContainers() {
    if (this.type === 'subtitles') {
      this.azureBlobService.getContainerBlobs_VTTFiles().subscribe(res => {
        if (res.statusBool) {
          this.exploredData = res.data.data;
          this.exploredFile = res.data.file;
          this.dataSource.data = res.data.file;
          this.isPreview = false;
        }
      });
    } else if (this.type === 'videos') {
      this.azureBlobService.getContainerBlobs().subscribe(res => {
        if (res.statusBool) {
          this.exploredData = res.data.data;
          this.exploredFile = res.data.file;
          this.dataSource.data = res.data.file;
          this.isPreview = true;
        }
      });
    }
  }

  getURL(row) {
    this.dialogRef.close(row);
  }

  closeModel() {
    this.dialogRef.close(false);
  }

  preview(row) {
    const dialogRefVideo = this.dialog.open(VideoPreviewModalComponent, {
      data: { url: row.url },
      height: '42%',
      width: '30%',
      closeOnNavigation: true,
      disableClose: true,
    });
    dialogRefVideo.afterClosed().subscribe(res => {
    });
  }

  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      type: node.type,
      level: level,
      expandable: !!node.children
    };
  }

  getLevel(node: TreeNode) {
    return node.level;
  }

  isExpandable(node: TreeNode) {
    return node.expandable;
  }

  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

  hasChild(index: number, node: TreeNode) {
    return node.expandable;
  }

  getNode(node) {
    const name = node.name;
    for (const fl of this.exploredFile) {
      const folder = fl.data.name.split('/');
      if (folder[1] === name) {
        fl.data.name = folder[1];
        this.exploredData = [];
        this.exploredData.push(fl.data);
        return;
      }
    }
  }

  getIndex(dataNode) {
    this.dataNodes = dataNode;
  }

}
