package com.cloud.gate.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cloud.gate.domain.PFound;
import com.cloud.gate.service.PFoundService;
import com.cloud.gate.web.rest.errors.BadRequestAlertException;
import com.cloud.gate.web.rest.util.HeaderUtil;
import com.cloud.gate.web.rest.util.PaginationUtil;
import com.cloud.gate.service.dto.PFoundCriteria;
import com.cloud.gate.service.PFoundQueryService;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing PFound.
 */
@RestController
@RequestMapping("/api")
public class PFoundResource {

    private final Logger log = LoggerFactory.getLogger(PFoundResource.class);

    private static final String ENTITY_NAME = "pFound";

    private final PFoundService pFoundService;

    private final PFoundQueryService pFoundQueryService;

    public PFoundResource(PFoundService pFoundService, PFoundQueryService pFoundQueryService) {
        this.pFoundService = pFoundService;
        this.pFoundQueryService = pFoundQueryService;
    }

    /**
     * POST  /p-founds : Create a new pFound.
     *
     * @param pFound the pFound to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pFound, or with status 400 (Bad Request) if the pFound has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/p-founds")
    @Timed
    public ResponseEntity<PFound> createPFound(@RequestBody PFound pFound) throws URISyntaxException {
        log.debug("REST request to save PFound : {}", pFound);
        if (pFound.getId() != null) {
            throw new BadRequestAlertException("A new pFound cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PFound result = pFoundService.save(pFound);
        return ResponseEntity.created(new URI("/api/p-founds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /p-founds : Updates an existing pFound.
     *
     * @param pFound the pFound to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pFound,
     * or with status 400 (Bad Request) if the pFound is not valid,
     * or with status 500 (Internal Server Error) if the pFound couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/p-founds")
    @Timed
    public ResponseEntity<PFound> updatePFound(@RequestBody PFound pFound) throws URISyntaxException {
        log.debug("REST request to update PFound : {}", pFound);
        if (pFound.getId() == null) {
            return createPFound(pFound);
        }
        PFound result = pFoundService.save(pFound);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pFound.getId().toString()))
            .body(result);
    }

    /**
     * GET  /p-founds : get all the pFounds.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of pFounds in body
     */
    @GetMapping("/p-founds")
    @Timed
    public ResponseEntity<List<PFound>> getAllPFounds(PFoundCriteria criteria,@ApiParam Pageable pageable) {
        log.debug("REST request to get PFounds by criteria: {}", criteria);
        Page<PFound> page = pFoundQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/p-founds");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /p-founds/:id : get the "id" pFound.
     *
     * @param id the id of the pFound to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pFound, or with status 404 (Not Found)
     */
    @GetMapping("/p-founds/{id}")
    @Timed
    public ResponseEntity<PFound> getPFound(@PathVariable Long id) {
        log.debug("REST request to get PFound : {}", id);
        PFound pFound = pFoundService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pFound));
    }

    /**
     * DELETE  /p-founds/:id : delete the "id" pFound.
     *
     * @param id the id of the pFound to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/p-founds/{id}")
    @Timed
    public ResponseEntity<Void> deletePFound(@PathVariable Long id) {
        log.debug("REST request to delete PFound : {}", id);
        pFoundService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/p-founds?query=:query : search for the pFound corresponding
     * to the query.
     *
     * @param query the query of the pFound search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/p-founds")
    @Timed
    public ResponseEntity<List<PFound>> searchPFounds(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of PFounds for query {}", query);
        Page<PFound> page = pFoundService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/p-founds");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
