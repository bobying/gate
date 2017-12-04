package com.cloud.gate.security;

import com.cloud.gate.config.Constants;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import java.util.Optional;

/**
 * Implementation of AuditorAware based on Spring Security.
 */
@Component
public class SpringSecurityAuditorAware implements AuditorAware<String> {

    @Override
    public String getCurrentAuditor() {
        final Optional<String> userName = SecurityUtils.getCurrentUserLogin();
        return userName.isPresent() ? userName.get() : Constants.SYSTEM_ACCOUNT;
    }
}
