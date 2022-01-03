package com.nsehic.springfullstackapplication.student;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author nerminsehic
 * Date: 1/1/2022
 * Time: 4:16 pm
 */
@RestController
@RequestMapping("/api/v1/students")
public class StudentController
{

    private final StudentService studentService;

    public StudentController(StudentService studentService) {this.studentService = studentService;}

    @GetMapping
    public List<Student> getAllStudents()
    {
        return studentService.fetchAllStudents();
    }

    @GetMapping("{id}")
    public Student getStudentById(@PathVariable Long id)
    {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@Valid @RequestBody Student student)
    {
        return studentService.createStudent(student);
    }

    @DeleteMapping("{id}")
    public Student deleteStudent(@PathVariable Long id)
    {
        return studentService.deleteStudent(id);
    }
}
