package com.cloud.gate.service;

import com.cloud.gate.domain.PFound;
import com.cloud.gate.repository.PFoundRepository;
import com.cloud.gate.repository.search.PFoundSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing PFound.
 */
@Service
@Transactional
public class PFoundService {

    private final Logger log = LoggerFactory.getLogger(PFoundService.class);

    private final PFoundRepository pFoundRepository;

    private final PFoundSearchRepository pFoundSearchRepository;

    public PFoundService(PFoundRepository pFoundRepository, PFoundSearchRepository pFoundSearchRepository) {
        this.pFoundRepository = pFoundRepository;
        this.pFoundSearchRepository = pFoundSearchRepository;
    }

    /**
     * Save a pFound.
     *
     * @param pFound the entity to save
     * @return the persisted entity
     */
    public PFound save(PFound pFound) {
        log.debug("Request to save PFound : {}", pFound);
        PFound result = pFoundRepository.save(pFound);
        pFoundSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the pFounds.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PFound> findAll(Pageable pageable) {
        log.debug("Request to get all PFounds");
        return pFoundRepository.findAll(pageable);
    }

    /**
     *  Get one pFound by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public PFound findOne(Long id) {
        log.debug("Request to get PFound : {}", id);
        return pFoundRepository.findOne(id);
    }

    /**
     *  Delete the  pFound by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PFound : {}", id);
        pFoundRepository.delete(id);
        pFoundSearchRepository.delete(id);
    }

    /**
     * Search for the pFound corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PFound> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of PFounds for query {}", query);
        Page<PFound> result = pFoundSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
