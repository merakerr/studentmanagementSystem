package project.synchrony.StudentManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.synchrony.StudentManagementSystem.model.Student;
import project.synchrony.StudentManagementSystem.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    @Override
    public Student updateStudent(Long id, Student student) {
        // Check if the student exists, and if so, update them
        if (studentRepository.existsById(id)) {
            student.setId(id);
            return studentRepository.save(student); // Save the updated student
        } else {
            throw new IllegalArgumentException("Student with id " + id + " does not exist.");
        }
    }

    @Override
    public void deleteStudent(Long id) {
        // Delete the student by ID
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Student with id " + id + " does not exist.");
        }
    }
}