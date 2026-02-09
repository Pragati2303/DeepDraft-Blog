package com.spring.blog.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.spring.blog.Dto.PostRequest;
import com.spring.blog.Dto.PostResponse;
import com.spring.blog.GlobalVariables.Status;
import com.spring.blog.Model.BlogPost;
import com.spring.blog.Model.User;
import com.spring.blog.Repos.BlogPostRepo;
import com.spring.blog.Repos.UserRepo;

@Service
public class BlogPostService {

    private final BlogPostRepo blogPostRepo;
    private final UserRepo userRepo;

    // ✅ REAL constructor (no return type)
    public BlogPostService(BlogPostRepo blogPostRepo, UserRepo userRepo) {
        this.blogPostRepo = blogPostRepo;
        this.userRepo = userRepo;
    }

    public PostResponse createPost(PostRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User author = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BlogPost post = new BlogPost();
        post.setTitle(request.getTitle());
        post.setShortDescription(request.getShortDescription());
        post.setDescription(request.getDescription());
        post.setImage(request.getImagePath());
        post.setAuthor(author);
        post.setStatus(Status.valueOf(request.getStatus()));
        post.setCreatedAt(LocalDateTime.now());

        BlogPost saved = blogPostRepo.save(post);
        return mapToResponse(saved);
    }

    private PostResponse mapToResponse(BlogPost post) {
        PostResponse res = new PostResponse();
        res.setId(post.getId());
        res.setTitle(post.getTitle());
        res.setStatus(post.getStatus().toString());
        res.setShortDescription(post.getShortDescription());
        res.setDescription(post.getDescription());
        res.setImagePath(post.getImage());
        res.setAuthor(post.getAuthor().getUsername());
        res.setCreatedAt(post.getCreatedAt());
        res.setUpdatedAt(post.getUpdatedAt());
        return res;
    }

    public List<PostResponse> getAllPosts() {
        return blogPostRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public PostResponse getPostById(Long id) {
        BlogPost post = blogPostRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));

        return mapToResponse(post);
    }

    public void deletePost(Long id) {
        try {
            BlogPost post = blogPostRepo.findById(id).orElseThrow(
                    () -> new RuntimeException("Post not found with id " + id));

            blogPostRepo.delete(post);

        } catch (Exception e) {

        }
    }

    public PostResponse updatePost(Long postId, PostRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User currentUser = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BlogPost post = blogPostRepo.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + postId));

        // 🔐 Author check
        if (!post.getAuthor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You are not allowed to edit this post");
        }

        post.setTitle(request.getTitle());
        post.setShortDescription(request.getShortDescription());
        post.setDescription(request.getDescription());
        post.setUpdatedAt(LocalDateTime.now());

        if (request.getImagePath() != null) {
            post.setImage(request.getImagePath());
        }

        BlogPost updated = blogPostRepo.save(post);
        return mapToResponse(updated);
    }

    public List<PostResponse> searchByTitle(String title) {
        return blogPostRepo
                .findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}
