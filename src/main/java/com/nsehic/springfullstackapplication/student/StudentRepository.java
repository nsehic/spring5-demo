package com.nsehic.springfullstackapplication.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author nerminsehic
 * Date: 2/1/2022
 * Time: 3:34 pm
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long>
{
    Optional<Student> findByEmail(String email);
}
