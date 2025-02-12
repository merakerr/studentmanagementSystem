package project.synchrony.StudentManagementSystem.service;

import project.synchrony.StudentManagementSystem.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {

    // Method to create a new student
    Student createStudent(Student student);

    // Method to get all students
    List<Student> getAllStudents();

    // Method to get a student by ID
    Optional<Student> getStudentById(Long id);

    // Method to update a student by ID
    Student updateStudent(Long id, Student student);

    // Method to delete a student by ID
    void deleteStudent(Long id);
}