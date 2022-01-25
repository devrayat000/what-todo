package util

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"gorm.io/gorm/clause"
)

func GetColumns(ctx context.Context) (columns []clause.Column) {
	fields := graphql.CollectFieldsCtx(ctx, nil)

	for _, column := range fields {
		prefixColumn := getPreloadString("", column.Name)
		columns = append(columns, clause.Column{Name: prefixColumn})
	}
	return
}

func GetPreloads(ctx context.Context) []string {
	return getNestedPreloads(
		graphql.GetOperationContext(ctx),
		graphql.CollectFieldsCtx(ctx, nil),
		"",
	)
}

func getNestedPreloads(ctx *graphql.OperationContext, fields []graphql.CollectedField, prefix string) (preloads []string) {
	for _, column := range fields {
		prefixColumn := getPreloadString(prefix, column.Name)
		preloads = append(preloads, prefixColumn)
		preloads = append(preloads, getNestedPreloads(ctx, graphql.CollectFields(ctx, column.Selections, nil), prefixColumn)...)
	}
	return
}

func getPreloadString(prefix, name string) string {
	if len(prefix) > 0 {
		return prefix + "." + name
	}
	return name
}
