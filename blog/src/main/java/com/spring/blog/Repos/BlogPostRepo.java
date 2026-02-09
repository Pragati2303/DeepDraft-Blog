package com.spring.blog.Repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.blog.Model.BlogPost;

@Repository
public interface BlogPostRepo extends JpaRepository<BlogPost, Long> {

    List<BlogPost> findByTitleContainingIgnoreCase(String title);
    // Spring Data JPA provides all CRUD methods automatically
}
