import { FC } from 'react';

interface SortFilterProps {
    sortOption: string;
    onSortChange: (option: string) => void;
}

const SortFilter: FC<SortFilterProps> = ({ sortOption, onSortChange }) => {
    return (
        <div className="filter-container">
            <label htmlFor="sortFilter">Sort By:</label>
            <select
                id="sortFilter"
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="filter-select"
            >
                <option value="createdAt-desc">Best Match</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-desc">A-Z</option>
            </select>
        </div>
    );
};

export default SortFilter;
