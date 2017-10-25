package com.cloud.gate.gateway;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.stereotype.Component;

@Component
public class TokenRelayFilter extends ZuulFilter {

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        return null;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 10000;
    }
}
