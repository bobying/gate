package com.cloud.gate.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.cloud.gate.domain.PFound;
import com.cloud.gate.domain.*; // for static metamodels
import com.cloud.gate.repository.PFoundRepository;
import com.cloud.gate.repository.search.PFoundSearchRepository;
import com.cloud.gate.service.dto.PFoundCriteria;


/**
 * Service for executing complex queries for PFound entities in the database.
 * The main input is a {@link PFoundCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link PFound} or a {@link Page} of {%link PFound} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class PFoundQueryService extends QueryService<PFound> {

    private final Logger log = LoggerFactory.getLogger(PFoundQueryService.class);


    private final PFoundRepository pFoundRepository;

    private final PFoundSearchRepository pFoundSearchRepository;

    public PFoundQueryService(PFoundRepository pFoundRepository, PFoundSearchRepository pFoundSearchRepository) {
        this.pFoundRepository = pFoundRepository;
        this.pFoundSearchRepository = pFoundSearchRepository;
    }

    /**
     * Return a {@link List} of {%link PFound} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PFound> findByCriteria(PFoundCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<PFound> specification = createSpecification(criteria);
        return pFoundRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link PFound} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<PFound> findByCriteria(PFoundCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<PFound> specification = createSpecification(criteria);
        return pFoundRepository.findAll(specification, page);
    }

    /**
     * Function to convert PFoundCriteria to a {@link Specifications}
     */
    private Specifications<PFound> createSpecification(PFoundCriteria criteria) {
        Specifications<PFound> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), PFound_.id));
            }
        }
        return specification;
    }

}
