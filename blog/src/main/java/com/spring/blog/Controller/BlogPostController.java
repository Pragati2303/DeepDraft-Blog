package com.spring.blog.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spring.blog.Dto.PostRequest;
import com.spring.blog.Dto.PostResponse;
import com.spring.blog.Services.BlogPostService;

@RestController
@RequestMapping("/api/posts")
public class BlogPostController {

    private final BlogPostService service;

    // ✅ REAL constructor
    public BlogPostController(BlogPostService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PostResponse> create(@RequestBody PostRequest request) {
        return new ResponseEntity<>(service.createPost(request), HttpStatus.CREATED);
    }

    @GetMapping
    public List<PostResponse> getAll() {
        return service.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostResponse getById(@PathVariable Long id) {
        return service.getPostById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        service.deletePost(id);
    }

    @GetMapping("edit/{id}")
    public PostResponse EditBlogById(@PathVariable Long id) {
        return service.getPostById(id);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<PostResponse> updatePost(
            @PathVariable Long id,
            @RequestBody PostRequest request) {
        PostResponse response = service.updatePost(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public List<PostResponse> getPosts(
            @RequestParam(required = false) String title) {

        if (title != null && !title.isBlank()) {
            return service.searchByTitle(title);
        }

        return service.getAllPosts();
    }
}
