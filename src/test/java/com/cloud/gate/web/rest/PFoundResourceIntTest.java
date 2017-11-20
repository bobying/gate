package com.cloud.gate.web.rest;

import com.cloud.gate.GateApp;

import com.cloud.gate.config.SecurityBeanOverrideConfiguration;

import com.cloud.gate.domain.PFound;
import com.cloud.gate.repository.PFoundRepository;
import com.cloud.gate.service.PFoundService;
import com.cloud.gate.repository.search.PFoundSearchRepository;
import com.cloud.gate.web.rest.errors.ExceptionTranslator;
import com.cloud.gate.service.dto.PFoundCriteria;
import com.cloud.gate.service.PFoundQueryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PFoundResource REST controller.
 *
 * @see PFoundResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {GateApp.class, SecurityBeanOverrideConfiguration.class})
public class PFoundResourceIntTest {

    @Autowired
    private PFoundRepository pFoundRepository;

    @Autowired
    private PFoundService pFoundService;

    @Autowired
    private PFoundSearchRepository pFoundSearchRepository;

    @Autowired
    private PFoundQueryService pFoundQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPFoundMockMvc;

    private PFound pFound;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PFoundResource pFoundResource = new PFoundResource(pFoundService, pFoundQueryService);
        this.restPFoundMockMvc = MockMvcBuilders.standaloneSetup(pFoundResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PFound createEntity(EntityManager em) {
        PFound pFound = new PFound();
        return pFound;
    }

    @Before
    public void initTest() {
        pFoundSearchRepository.deleteAll();
        pFound = createEntity(em);
    }

    @Test
    @Transactional
    public void createPFound() throws Exception {
        int databaseSizeBeforeCreate = pFoundRepository.findAll().size();

        // Create the PFound
        restPFoundMockMvc.perform(post("/api/p-founds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pFound)))
            .andExpect(status().isCreated());

        // Validate the PFound in the database
        List<PFound> pFoundList = pFoundRepository.findAll();
        assertThat(pFoundList).hasSize(databaseSizeBeforeCreate + 1);
        PFound testPFound = pFoundList.get(pFoundList.size() - 1);

        // Validate the PFound in Elasticsearch
        PFound pFoundEs = pFoundSearchRepository.findOne(testPFound.getId());
        assertThat(pFoundEs).isEqualToComparingFieldByField(testPFound);
    }

    @Test
    @Transactional
    public void createPFoundWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pFoundRepository.findAll().size();

        // Create the PFound with an existing ID
        pFound.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPFoundMockMvc.perform(post("/api/p-founds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pFound)))
            .andExpect(status().isBadRequest());

        // Validate the PFound in the database
        List<PFound> pFoundList = pFoundRepository.findAll();
        assertThat(pFoundList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPFounds() throws Exception {
        // Initialize the database
        pFoundRepository.saveAndFlush(pFound);

        // Get all the pFoundList
        restPFoundMockMvc.perform(get("/api/p-founds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pFound.getId().intValue())));
    }

    @Test
    @Transactional
    public void getPFound() throws Exception {
        // Initialize the database
        pFoundRepository.saveAndFlush(pFound);

        // Get the pFound
        restPFoundMockMvc.perform(get("/api/p-founds/{id}", pFound.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pFound.getId().intValue()));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultPFoundShouldBeFound(String filter) throws Exception {
        restPFoundMockMvc.perform(get("/api/p-founds?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pFound.getId().intValue())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultPFoundShouldNotBeFound(String filter) throws Exception {
        restPFoundMockMvc.perform(get("/api/p-founds?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingPFound() throws Exception {
        // Get the pFound
        restPFoundMockMvc.perform(get("/api/p-founds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePFound() throws Exception {
        // Initialize the database
        pFoundService.save(pFound);

        int databaseSizeBeforeUpdate = pFoundRepository.findAll().size();

        // Update the pFound
        PFound updatedPFound = pFoundRepository.findOne(pFound.getId());

        restPFoundMockMvc.perform(put("/api/p-founds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPFound)))
            .andExpect(status().isOk());

        // Validate the PFound in the database
        List<PFound> pFoundList = pFoundRepository.findAll();
        assertThat(pFoundList).hasSize(databaseSizeBeforeUpdate);
        PFound testPFound = pFoundList.get(pFoundList.size() - 1);

        // Validate the PFound in Elasticsearch
        PFound pFoundEs = pFoundSearchRepository.findOne(testPFound.getId());
        assertThat(pFoundEs).isEqualToComparingFieldByField(testPFound);
    }

    @Test
    @Transactional
    public void updateNonExistingPFound() throws Exception {
        int databaseSizeBeforeUpdate = pFoundRepository.findAll().size();

        // Create the PFound

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPFoundMockMvc.perform(put("/api/p-founds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pFound)))
            .andExpect(status().isCreated());

        // Validate the PFound in the database
        List<PFound> pFoundList = pFoundRepository.findAll();
        assertThat(pFoundList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePFound() throws Exception {
        // Initialize the database
        pFoundService.save(pFound);

        int databaseSizeBeforeDelete = pFoundRepository.findAll().size();

        // Get the pFound
        restPFoundMockMvc.perform(delete("/api/p-founds/{id}", pFound.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean pFoundExistsInEs = pFoundSearchRepository.exists(pFound.getId());
        assertThat(pFoundExistsInEs).isFalse();

        // Validate the database is empty
        List<PFound> pFoundList = pFoundRepository.findAll();
        assertThat(pFoundList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPFound() throws Exception {
        // Initialize the database
        pFoundService.save(pFound);

        // Search the pFound
        restPFoundMockMvc.perform(get("/api/_search/p-founds?query=id:" + pFound.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pFound.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PFound.class);
        PFound pFound1 = new PFound();
        pFound1.setId(1L);
        PFound pFound2 = new PFound();
        pFound2.setId(pFound1.getId());
        assertThat(pFound1).isEqualTo(pFound2);
        pFound2.setId(2L);
        assertThat(pFound1).isNotEqualTo(pFound2);
        pFound1.setId(null);
        assertThat(pFound1).isNotEqualTo(pFound2);
    }
}
