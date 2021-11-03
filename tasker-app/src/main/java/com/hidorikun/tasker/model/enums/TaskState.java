package com.hidorikun.tasker.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum TaskState {
    OPEN("OPEN"),
    IN_PROGRESS("IN_PROGRESS"),
    IN_REVIEW("IN_REVIEW"),
    DONE("DONE");

    private String value;

    @JsonCreator
    public static TaskState decode(final String value) {
        return Stream.of(TaskState.values())
                .filter(targetEnum -> targetEnum.value.equals(value))
                .findFirst()
                .orElse(null);
    }

    TaskState(String value){
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
