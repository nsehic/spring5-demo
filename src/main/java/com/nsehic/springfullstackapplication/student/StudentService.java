package com.nsehic.springfullstackapplication.student;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author nerminsehic
 * Date: 2/1/2022
 * Time: 3:35 pm
 */
@Service
public class StudentService
{
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {this.studentRepository = studentRepository;}

    public List<Student> fetchAllStudents()
    {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id)
    {
        return studentRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public Student createStudent(Student student)
    {
        Optional<Student> duplicateStudent = studentRepository.findByEmail(student.getEmail());
        if(!duplicateStudent.isPresent()) {
            return studentRepository.save(student);
        }

        throw new IllegalStateException(String.format("User with email %s already exists", student.getEmail()));
    }

    public Student deleteStudent(Long id)
    {
        Optional<Student> studentOptional = studentRepository.findById(id);
        if(studentOptional.isPresent()) {
            Student student = studentOptional.get();
            studentRepository.delete(student);
            return student;
        }

        throw new IllegalStateException(String.format("Student with id %d does not exist", id));
    }
}
