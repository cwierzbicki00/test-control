import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list-component.html',
  styleUrls: ['./post-list-component.css']
})

export class PostListComponent implements OnInit, OnDestroy{

posts: Post[] = [];
totalPosts = 0;
postsPerPage = 2;
currentPage = 1;
pageSizeOptions = [1,2,5,10];
private postsSub: Subscription;

constructor(private postsService: PostsService) {}
isLoading = false;


ngOnInit(){
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.isLoading = true;

    this.postsSub = this.postsService.getPostUpdateListener().subscribe( (postData: {posts: Post[]; postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }
onChangedPage(pageData: PageEvent){
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
}

onDelete(postId: string){
  this.isLoading = true;
  this.postsService.deletePost(postId).subscribe(()=>{
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  });
  this.isLoading = false;
}

ngOnDestroy(){
  this.postsSub.unsubscribe();
  }
}
