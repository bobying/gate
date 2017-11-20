package com.cloud.gate.repository;

import com.cloud.gate.domain.PFound;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PFound entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PFoundRepository extends JpaRepository<PFound, Long>, JpaSpecificationExecutor<PFound> {

}
