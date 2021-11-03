package com.hidorikun.tasker.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum TaskType {
    DEFECT("DEFECT"),
    STORY("STORY"),
    TASK("TASK");

    private String value;

    @JsonCreator
    public static TaskType decode(final String value) {
        return Stream.of(TaskType.values())
                .filter(targetEnum -> targetEnum.value.equals(value))
                .findFirst()
                .orElse(null);
    }

    TaskType(String value){
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
