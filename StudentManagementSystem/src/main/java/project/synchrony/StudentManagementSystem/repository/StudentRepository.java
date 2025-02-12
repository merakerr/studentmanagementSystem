package project.synchrony.StudentManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.synchrony.StudentManagementSystem.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}