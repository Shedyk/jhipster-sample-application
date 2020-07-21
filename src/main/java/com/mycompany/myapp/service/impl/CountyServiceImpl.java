package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CountyService;
import com.mycompany.myapp.domain.County;
import com.mycompany.myapp.repository.CountyRepository;
import com.mycompany.myapp.repository.search.CountySearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link County}.
 */
@Service
@Transactional
public class CountyServiceImpl implements CountyService {

    private final Logger log = LoggerFactory.getLogger(CountyServiceImpl.class);

    private final CountyRepository countyRepository;

    private final CountySearchRepository countySearchRepository;

    public CountyServiceImpl(CountyRepository countyRepository, CountySearchRepository countySearchRepository) {
        this.countyRepository = countyRepository;
        this.countySearchRepository = countySearchRepository;
    }

    @Override
    public County save(County county) {
        log.debug("Request to save County : {}", county);
        County result = countyRepository.save(county);
        countySearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<County> findAll() {
        log.debug("Request to get all Counties");
        return countyRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<County> findOne(Long id) {
        log.debug("Request to get County : {}", id);
        return countyRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete County : {}", id);
        countyRepository.deleteById(id);
        countySearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<County> search(String query) {
        log.debug("Request to search Counties for query {}", query);
        return StreamSupport
            .stream(countySearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
